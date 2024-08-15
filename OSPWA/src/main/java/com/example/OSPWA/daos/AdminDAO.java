package com.example.OSPWA.daos;

import com.example.OSPWA.entities.Users;

public interface AdminDAO {
    Users getUserById(Long id);
}
