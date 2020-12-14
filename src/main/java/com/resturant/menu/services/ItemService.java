/*
 * file Name: ItemService.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Service interface for Items
 */

package com.resturant.menu.services;

import com.resturant.menu.models.Item;

import java.util.Optional;

public interface ItemService {
    Iterable<Item> getItems();

    Item saveItem(Item item);

    Optional<Item> getItemById(String id);

    Item updateItem(String id, Item item);

    String deleteItem(String id);
}
