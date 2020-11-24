package com.resturant.menu.services;

import com.resturant.menu.models.Item;

import java.util.Optional;

public interface ItemService {
    Iterable<Item> getItems();
    Optional<Item> getItemsBySectionId(String sectionId);
    Item saveItem(Item item);
    Optional<Item> getItemById(String id);
    Item updateItem(String id, Item item);
    String deleteItem(String id);
}
