package com.codecool.lookatthis.controllers;

import com.codecool.lookatthis.models.Location;
import com.codecool.lookatthis.models.Tag;
import com.codecool.lookatthis.service.LocationService;
import com.codecool.lookatthis.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
public class IndexController {

    private LocationService locationService;
    private TagService tagService;

    @Autowired
    public IndexController(LocationService locationService, TagService tagService) {
        this.locationService = locationService;
        this.tagService = tagService;
    }

    @GetMapping("/location-list")
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    @PostMapping("/add-location")
    public void saveLocation(@RequestBody Location location) {
        locationService.addLocation(location);
    }

    @GetMapping("/location/{id}")
    public Location getLocationById(@PathVariable("id") Long id) {
        return locationService.getLocationById(id);
    }

    @PutMapping("/edit-location")
    public void updateLocation(@RequestBody Location location) {
        locationService.updateLocation(location);
    }

    @DeleteMapping("/delete-location/{id}")
    public void deleteLocation(@PathVariable("id") Long id) {
        locationService.deleteById(id);
    }

    @GetMapping("/tag-list")
    public List<Tag> getAllTags() {
        return tagService.getAllTags();
    }

    @GetMapping("/locations-by-tag/{id}")
    public List<Location> getLocationsByTag(@PathVariable("id") Long id) {
        return locationService.getAllByTag(id);
    }
  
    @GetMapping("/location-list/{text}")
    public List<Location> getSearchedLocations(@PathVariable("text") String text) {
        return locationService.getAllBySearch(text);
    }

}
