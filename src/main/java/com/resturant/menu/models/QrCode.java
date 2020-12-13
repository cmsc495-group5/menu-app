/*
 * file Name: QrCode.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Model for QrCodes
 */

package com.resturant.menu.models;

public class QrCode {
    String tableId;
    String url;
    String image;
    String baseUrl;

    public QrCode(String image, String tableId, String url, String baseUrl) {
        this.image = image;
        this.tableId = tableId;
        this.url = url;
        this.baseUrl = baseUrl;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTableId() {
        return tableId;
    }

    public void setTableId(String tableId) {
        this.tableId = tableId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
