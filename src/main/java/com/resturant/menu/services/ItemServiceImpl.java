package com.resturant.menu.services;

import com.resturant.menu.models.Item;
import com.resturant.menu.repositories.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    private ItemsRepository itemsRepository;

    @Autowired
    public ItemServiceImpl(ItemsRepository itemsRepository){
        this.itemsRepository = itemsRepository;
    }

    public Iterable<Item> getItems(){
        return itemsRepository.findAll();
    }
    
    public Optional<Item> getItemsBySectionId(String sectionId) {
        return itemsRepository.findAllBySectionId(sectionId);
    }

    public Item saveItem(Item sec){
        sec.setUpdated(new Date().toString());
        itemsRepository.save(sec);
        return sec;
    }

    public Optional<Item> getItemById(String id) {
        return itemsRepository.findById(id);
    }

    public Item updateItem(String id, Item item) {
        Optional<Item> optSec = itemsRepository.findById(id);
        Item s = optSec.get();
        
        if(item.getName() != null){
            s.setName(item.getName());
        }
        
        if(item.getDescription() != null){
            s.setDescription(item.getDescription());
        }
        
        if(item.getInternalDescription() != null){
            s.setInternalDescription(item.getInternalDescription());
        }
        
        if(item.getPrice() != null) {
            s.setPrice(item.getPrice());
        }
        
        if (item.getImage() != null) {
            s.setImage(item.getImage());
        }
        
        if (item.getOptions() != null) {
            s.setOptions(item.getOptions());
        }
        
        if (item.getSectionId() != null) {
            s.setSectionId(item.getSectionId());
        }

        s.setUpdated(new Date().toString());
        itemsRepository.save(s);
        return s;
    }

    public String deleteItem(String id) {
        Optional<Item> optItem = itemsRepository.findById(id);
        Item sec = optItem.get();
        itemsRepository.delete(sec);
        return "";
    }
}
