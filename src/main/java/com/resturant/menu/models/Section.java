/*
 * file Name: Section.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Model for Sections
 */

package com.resturant.menu.models;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sections")
public class Section {
    @Id
    String id;
    String title;
    String description;
    @BsonProperty(value = "internal_description")
    String internalDescription;
    String updated;

    @DBRef
    Item[] items;

    public Section(String title, String description, String internalDescription) {
        this.title = title;
        this.description = description;
        this.internalDescription = internalDescription;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInternalDescription() {
        return internalDescription;
    }

    public void setInternalDescription(String internalDescription) {
        this.internalDescription = internalDescription;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }

    public Item[] getItems() {
        return items;
    }

    public void setItems(Item[] items) {
        this.items = items;
    }
}
