package com.codecool.lookatthis.controller;

import com.codecool.lookatthis.entity.Location;
import com.codecool.lookatthis.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/location")
public class LocationController {

    private LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/list")
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    @PostMapping("/add")
    public void saveLocation(@RequestBody Location location) {
        locationService.addLocation(location);
    }

    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable("id") Long id) {
        return locationService.getLocationById(id);
    }

    @PutMapping("/edit")
    public void updateLocation(@RequestBody Location location) {
        locationService.updateLocation(location);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteLocation(@PathVariable("id") Long id) {
        locationService.deleteById(id);
    }

    @GetMapping("/tag/{id}")
    public List<Location> getLocationsByTag(@PathVariable("id") Long id) {
        return locationService.getAllByTag(id);
    }
  
    @GetMapping("/search/{text}")
    public List<Location> getSearchedLocations(@PathVariable("text") String text) {
        return locationService.getAllBySearch(text);
    }

}
