package com.example.SWP_Backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Nationalized;

import java.time.LocalDateTime;

/**
 * BlogPosts entity đại diện cho một bài viết cộng đồng/blog.
 * Dùng cho mọi user (bao gồm coach, admin).
 */
@Entity
@Table(name = "BlogPosts")
public class BlogPosts {

    /** Khóa chính tự tăng của bài viết (ID) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    /** User (author) đã đăng bài, liên kết tới Users */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AuthorUserID", nullable = false)
    private Coach author;

    /** Tiêu đề bài viết */
    @Column(nullable = false, length = 255)
    @Nationalized
    private String title;

    /** Đường dẫn định danh (slug) duy nhất */
    @Column(nullable = false, length = 255, unique = true)
    private String slug;

    /** Nội dung chính của bài viết */
    @Column(nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String content;

    /** Tóm tắt nội dung */
    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String excerpt;

    /** Ngày đăng */
    @Column(nullable = false)
    private LocalDateTime publishDate = LocalDateTime.now();

    /** Ngày chỉnh sửa cuối */
    private LocalDateTime lastModifiedDate;

    /** Danh mục bài viết */
    @Column(length = 255)
    @Nationalized
    private String category;

    /** Tag bài viết (dạng text, ví dụ: "tip,success") */
    @Column(length = 255)
    private String tags;

    /** Số lượt xem */
    @Column(nullable = false)
    private Integer views = 0;

    /**
     * Trạng thái bài viết:
     * - draft: bản nháp
     * - published: đã đăng
     * - pending: chờ duyệt
     * - rejected: bị từ chối
     */
    @Column(nullable = false, length = 255)
    private String status = "draft";

    /** Ảnh nổi bật của bài viết */
    @Column(length = 255)
    private String featuredImageURL;

    // ====== GETTER/SETTER, Constructors ====== //


    public BlogPosts(Long postId, Coach author, String title, String slug, String content, String excerpt, LocalDateTime publishDate, LocalDateTime lastModifiedDate, String category, String tags, Integer views, String status, String featuredImageURL) {
        this.postId = postId;
        this.author = author;
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.excerpt = excerpt;
        this.publishDate = publishDate;
        this.lastModifiedDate = lastModifiedDate;
        this.category = category;
        this.tags = tags;
        this.views = views;
        this.status = status;
        this.featuredImageURL = featuredImageURL;
    }

    public BlogPosts() {
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Coach getAuthor() {
        return author;
    }

    public void setAuthor(Coach author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getExcerpt() {
        return excerpt;
    }

    public void setExcerpt(String excerpt) {
        this.excerpt = excerpt;
    }

    public LocalDateTime getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(LocalDateTime publishDate) {
        this.publishDate = publishDate;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Integer getViews() {
        return views;
    }

    public void setViews(Integer views) {
        this.views = views;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFeaturedImageURL() {
        return featuredImageURL;
    }

    public void setFeaturedImageURL(String featuredImageURL) {
        this.featuredImageURL = featuredImageURL;
    }
}
