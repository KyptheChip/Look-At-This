package com.codecool.lookatthis.repository;

import com.codecool.lookatthis.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    List<Location> findAllByOrderByTitleAsc();
    List<Location> findAllByOrderByTitleDesc();
    List<Location> findAllByTitleContainingIgnoreCase(String text);
    List<Location> findAllByMessageContainingIgnoreCase(String text);

    @Query(value = "SELECT * FROM location " +
            "JOIN location_tags lt on location.id = lt.location_id " +
            "WHERE tags_id = :id",
            nativeQuery = true)
    List<Location> findAllByTagId(@Param("id") Long id);

}
