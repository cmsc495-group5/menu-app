package com.resturant.menu.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orders")
public class Order {
    public static String PLACED = "pending";
    public static String PREPARING = "preparing";
    public static String FILLED = "filled";
    public static String COMPLETE = "complete";

    @Id
    String id;
    String status;
    String updated;
    String table;
    Double total;

    @DBRef
    OrderItem[] orderItems;

    public Order(String status, OrderItem[] orderItems, String table) {
        this.status = status;
        this.orderItems = orderItems;
        this.table = table;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OrderItem[] getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(OrderItem[] orderItems) {
        Double total = 0.0;
        for (OrderItem item : orderItems) {
            total = total + item.getTotal();
        }
        setTotal(total);
        this.orderItems = orderItems;
    }

    public String getTable() {
        return table;
    }

    public void setTable(String table) {
        this.table = table;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }

    public Double getTotal() {
        return this.total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}