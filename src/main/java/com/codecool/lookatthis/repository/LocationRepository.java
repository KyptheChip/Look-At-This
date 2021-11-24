package com.codecool.lookatthis.repository;

import com.codecool.lookatthis.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    List<Location> findAllByOrderByTitleAsc();
    List<Location> findAllByOrderByTitleDesc();
    List<Location> findAllByTitleContaining(String text);
    List<Location> findAllByMessageContaining(String text);

}
