package com.resturant.menu.services;

import com.resturant.menu.models.OrderItem;
import com.resturant.menu.repositories.OrderItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    private OrderItemsRepository orderItemsRepository;

    @Autowired
    public OrderItemServiceImpl(OrderItemsRepository orderItemsRepository){
        this.orderItemsRepository = orderItemsRepository;
    }

    public Iterable<OrderItem> getOrders(){
        return orderItemsRepository.findAll();
    }

    public OrderItem saveOrder(OrderItem order){
        order.setUpdated(new Date().toString());
        orderItemsRepository.save(order);
        return order;
    }

    public Optional<OrderItem> getOrderById(String id) {
        return orderItemsRepository.findById(id);
    }

    public OrderItem updateOrder(String id, OrderItem order) {
        Optional<OrderItem> optSec = orderItemsRepository.findById(id);
        OrderItem s = optSec.get();
        
        if (order.getPrepNotes() != null) {
            s.setPrepNotes(order.getPrepNotes());
        }
        
        if (order.getItems() != null) {
            s.setItems(order.getItems());
        }
        
        if (order.getTable() != null) {
            s.setTable(order.getTable());
        }

        s.setUpdated(new Date().toString());
        orderItemsRepository.save(s);
        return s;
    }

    public String deleteOrder(String id) {
        Optional<OrderItem> optItem = orderItemsRepository.findById(id);
        OrderItem sec = optItem.get();
        orderItemsRepository.delete(sec);
        return "";
    }
}