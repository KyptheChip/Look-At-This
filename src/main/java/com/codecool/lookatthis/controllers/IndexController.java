package com.codecool.lookatthis.controllers;

import com.codecool.lookatthis.models.Location;
import com.codecool.lookatthis.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3001/")
@RestController
public class IndexController {

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/location-list")
    public List<Location> getAllLocations() {
        return (List<Location>) locationRepository.findAll();
    }

    @PostMapping("/add-location")
    public void saveLocation(@RequestBody Location location) {
        locationRepository.save(location);
    }


}
