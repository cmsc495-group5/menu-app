/*
 * file Name: ItemServiceImpl.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Implementation of the Item service interface
 */

package com.resturant.menu.services;

import com.resturant.menu.models.Item;
import com.resturant.menu.repositories.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemsRepository itemsRepository;

    @Autowired
    public ItemServiceImpl(ItemsRepository itemsRepository) {
        this.itemsRepository = itemsRepository;
    }

    public Iterable<Item> getItems() {
        return itemsRepository.findAll();
    }

    public Item saveItem(Item item) {
        item.setUpdated(new Date().toString());
        itemsRepository.save(item);
        return item;
    }

    public Optional<Item> getItemById(String id) {
        return itemsRepository.findById(id);
    }

    public Item updateItem(String id, Item item) {
        Optional<Item> optItem = itemsRepository.findById(id);
        Item itemToUpdate = optItem.get();

        if (item.getName() != null) {
            itemToUpdate.setName(item.getName());
        }

        if (item.getDescription() != null) {
            itemToUpdate.setDescription(item.getDescription());
        }

        if (item.getInternalDescription() != null) {
            itemToUpdate.setInternalDescription(item.getInternalDescription());
        }

        if (item.getPrice() != null) {
            itemToUpdate.setPrice(item.getPrice());
        }
        // we want to be able to remove images so no null check
        itemToUpdate.setImage(item.getImage());

        if (item.getOptions() != null) {
            itemToUpdate.setOptions(item.getOptions());
        }

        itemToUpdate.setUpdated(new Date().toString());
        itemsRepository.save(itemToUpdate);
        return itemToUpdate;
    }

    public String deleteItem(String id) {
        Optional<Item> optItem = itemsRepository.findById(id);
        Item item = optItem.get();
        itemsRepository.delete(item);
        return "";
    }
}
