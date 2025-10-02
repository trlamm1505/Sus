package com.example.SWP_Backend.repository;

import com.example.SWP_Backend.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    Optional<Achievement> findByCode(String code);
    List<Achievement> findByType(String type);

}
