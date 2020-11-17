package com.resturant.menu.models;


import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection= "menus")
public class Menu {
    @Id
    String id;
    String title;
    String description;
    @BsonProperty(value="internal_description")
    String internalDescription;
    @BsonProperty(value="image_id")
    Integer imageId;
    Integer[] sections;

    Boolean active;

    String updated;
    public Menu(String title, String description, String internalDescription, Integer imageId, Integer[] sections) {
        this.title = title;
        this.description = description;
        this.internalDescription = internalDescription;
        this.imageId = imageId;
        this.sections = sections;
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

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public Integer[] getSections() {
        return sections;
    }

    public void setSections(Integer[] sections) {
        this.sections = sections;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }

}
