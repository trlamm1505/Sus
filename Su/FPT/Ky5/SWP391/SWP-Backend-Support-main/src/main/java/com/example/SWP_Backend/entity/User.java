package com.example.SWP_Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Long userId;

    @Column(name = "Username", nullable = false, unique = true, length = 255)
    @Nationalized
    private String username;

    @Column(name = "PasswordHash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "Email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "FullName", length = 255)
    @Nationalized
    private String fullName;

    @Column(name = "RegistrationDate", nullable = false)
    private LocalDateTime registrationDate;

    @Column(name = "LastLoginDate")
    private LocalDateTime lastLoginDate;

    @Column(name = "ProfilePictureURL", length = 255)
    private String profilePictureUrl;

    @Column(name = "CurrentMembershipPackageID")
    private Integer currentMembershipPackageId;

    @Column(name = "SubscriptionEndDate")
    private LocalDate subscriptionEndDate;

    @Column(name = "CoachID")
    private Long coachId;

    @Column(name = "Role", nullable = false, length = 255)
    private String role = "member"; // Default value

    @Column(name = "Enabled", nullable = false)
    private boolean enabled = false; // Thêm trường này để xác thực email

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    public LocalDateTime getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(LocalDateTime lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public Integer getCurrentMembershipPackageId() {
        return currentMembershipPackageId;
    }

    public void setCurrentMembershipPackageId(Integer currentMembershipPackageId) {
        this.currentMembershipPackageId = currentMembershipPackageId;
    }

    public LocalDate getSubscriptionEndDate() {
        return subscriptionEndDate;
    }

    public void setSubscriptionEndDate(LocalDate subscriptionEndDate) {
        this.subscriptionEndDate = subscriptionEndDate;
    }

    public Long getCoachId() {
        return coachId;
    }

    public void setCoachId(Long coachId) {
        this.coachId = coachId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    protected void onCreate() {
        if (registrationDate == null) {
            registrationDate = LocalDateTime.now();
        }
        if (role == null || role.trim().isEmpty()) {
            role = "member";
        }
        if (username == null || username.trim().isEmpty()) {
            username = email;
        }
    }
}
