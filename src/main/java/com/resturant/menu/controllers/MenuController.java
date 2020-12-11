package com.resturant.menu.controllers;

import com.resturant.menu.models.Image;
import com.resturant.menu.models.Menu;
import com.resturant.menu.services.ImageService;
import com.resturant.menu.services.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
public class MenuController {
    MenuService menuService;
    ImageService imageService;

    @Autowired
    public MenuController(MenuService menuService, ImageService imageService){
        this.menuService = menuService;
        this.imageService = imageService;
    }

    @RequestMapping(method= RequestMethod.GET, value="api/test")
    public String test() {
        return "test";
    }

    @RequestMapping(method= RequestMethod.GET, value="/menus")
    public Iterable<Menu> menu(){
        return menuService.getMenus();
    }

    @RequestMapping(method=RequestMethod.POST, value="/menus")
    public Menu save(@RequestBody Menu menu){
        menu.setUpdated(new Date().toString());

//        if (menu.getImg().get("src") == null) {
//            menuService.saveMenu(menu);
//            return menu;
//        } else if (menu.getImgID() != null) {
//            menu.setImgID(menu.getImgID());
//
//            menuService.saveMenu(menu);
//            return menu;
//        } else {
//            String n = menu.getImg().get("name").toString();
//
//            // Save the image in image collection and return the id to save in menu object
//            menu.setImgID(imageService.saveImage(new Image(n, menu.getImg().get("src").toString())).getId());
//
//            menuService.saveMenu(menu);
//            return menu;
//        }

        switch(menu.getImgID()) {
            case "0":
                System.out.println("No menu image up selected or uploaded");
                menuService.saveMenu(menu);
                return menu;
            case "1":
                System.out.println("Image was uploaded");
                String n = menu.getImg().get("name").toString();

                // Save the image in image collection and return the id to save in menu object
                menu.setImgID(imageService.saveImage(new Image(n, menu.getImg().get("src").toString())).getId());

                menuService.saveMenu(menu);
                return menu;
            default:
                System.out.println("Image was selected");
                menu.setImgID(menu.getImgID());

                menuService.saveMenu(menu);
                return menu;
        }

    }

    @RequestMapping(method=RequestMethod.GET, value="/menus/{id}")
    public Optional<Menu> show(@PathVariable String id) {
        return menuService.getMenuById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/menus/{id}")
    public Menu update(@PathVariable String id, @RequestBody Menu menu) {
        return menuService.updateMenu(id, menu);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/menus/{id}")
    public String delete(@PathVariable String id) {
        menuService.deleteMenu(id);
        return "";
    }

    @RequestMapping(method=RequestMethod.PUT, value="/menus/{id}/activate")
    public String activateMenu(@PathVariable String id){
        menuService.activateMenu(id);
        return "";
    }

    @RequestMapping(method=RequestMethod.GET, value="/menus/active")
    public Menu show(){
        return menuService.getActiveMenu();
    }
}