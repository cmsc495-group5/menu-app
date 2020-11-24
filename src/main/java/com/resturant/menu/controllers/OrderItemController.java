package com.resturant.menu.controllers;

import com.resturant.menu.models.OrderItem;
import com.resturant.menu.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
public class OrderItemController {
    OrderItemService orderItemService;

    @Autowired
    public OrderItemController(OrderItemService orderItemService){
        this.orderItemService = orderItemService;
    }

    @RequestMapping(method= RequestMethod.GET, value="/orders")
    public Iterable<OrderItem> item(){
        return orderItemService.getOrders();
    }

    @RequestMapping(method=RequestMethod.POST, value="/orders")
    public OrderItem save(@RequestBody OrderItem order){
        order.setUpdated(new Date().toString());
        orderItemService.saveOrder(order);
        return order;
    }

    @RequestMapping(method=RequestMethod.GET, value="/orders/{id}")
    public Optional<OrderItem> show(@PathVariable String id) {
        return orderItemService.getOrderById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/orders/{id}")
    public OrderItem update(@PathVariable String id, @RequestBody OrderItem order) {
        return orderItemService.updateOrder(id, order);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/orders/{id}")
    public String delete(@PathVariable String id) {
        orderItemService.deleteOrder(id);
        return "";
    }
}