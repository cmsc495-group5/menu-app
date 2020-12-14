/*
 * file Name: ImagesRepository.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Interface for Mongo db interactions for Images
 */

package com.resturant.menu.repositories;

import com.resturant.menu.models.Image;
import org.springframework.data.repository.CrudRepository;

public interface ImagesRepository extends CrudRepository<Image, String> {
    void delete(Image deleted);
}
