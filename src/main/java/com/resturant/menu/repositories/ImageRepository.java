package com.resturant.menu.repositories;

import com.resturant.menu.models.Image;
import org.springframework.data.repository.CrudRepository;

public interface ImageRepository extends CrudRepository<Image, String> {
    void delete(Image deleted);
}
