package com.codecool.lookatthis.service;

import com.codecool.lookatthis.models.Location;
import com.codecool.lookatthis.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public void addLocation(Location location) {
        locationRepository.save(location);
    }

    public Location getLocationById(Long id) {
        return locationRepository.findById(id).get();
    }

    public void updateLocation(Location updatedLocation) {
        Location location;
        Optional<Location> optional = locationRepository.findById(updatedLocation.getId());
        if (optional.isPresent()) {
            location = optional.get();

            location.setTitle(updatedLocation.getTitle());
            location.setMessage(updatedLocation.getMessage());
            location.setImageData(updatedLocation.getImageData());

            locationRepository.save(location);
        }
    }

    public void deleteById(Long id) {
        locationRepository.deleteById(id);
    }

    public List<Location> getAllOrderedByTitleAsc() {
        return locationRepository.findAllByOrderByTitleAsc();
    }

    public List<Location> getAllOrderedByTitleDesc() {
        return locationRepository.findAllByOrderByTitleDesc();
    }

    public List<Location> getAllBySearch(String text) {
        List<Location> locationsByTitle = locationRepository.findAllByTitleContainingIgnoreCase(text);
        List<Location> locationsByMessage = locationRepository.findAllByMessageContainingIgnoreCase(text);
        List<Location> resultingLocations;

        for (Location location : locationsByTitle){
            if (!locationsByMessage.contains(location))
                locationsByMessage.add(location);
        }
        resultingLocations = locationsByMessage;

        return resultingLocations;
    }

    public List<Location> getAllByTag(Long id) {
        return locationRepository.findAllByTagId(id);
    }
}
