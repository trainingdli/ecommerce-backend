const express = require('express');

const defaultCtrl = {
    healthcheck: (req, res) => {
        res.send({
            health: 'E-Kart is runing successfully'
        })
        res.status(200);
    },
    default: (req, res) => {
        res.send({
            data: 'Welcome to E-Kart'
        })
        res.status(200);
    }   
}

module.exports = defaultCtrl;