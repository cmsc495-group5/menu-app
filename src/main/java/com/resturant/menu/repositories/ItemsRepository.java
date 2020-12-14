/*
 * file Name: ItemsRepository.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Interface for Mongo db interactions for Items
 */

package com.resturant.menu.repositories;

import com.resturant.menu.models.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemsRepository extends CrudRepository<Item, String> {
    void delete(Item deleted);
}
