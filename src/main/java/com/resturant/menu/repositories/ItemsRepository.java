package com.resturant.menu.repositories;

import com.resturant.menu.models.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemsRepository extends CrudRepository<Item, String> {
    void delete(Item deleted);
}
