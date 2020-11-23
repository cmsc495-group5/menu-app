package com.resturant.menu.repositories;

import org.springframework.data.repository.query.Param;

import com.resturant.menu.models.Item;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ItemsRepository extends CrudRepository<Item, String> {
    void delete(Item deleted);
    
    Optional<Item> findAllBySectionId(@Param("sectionId") String sectionId);
}
