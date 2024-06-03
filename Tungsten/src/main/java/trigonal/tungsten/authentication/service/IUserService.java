package trigonal.tungsten.authentication.service;

import trigonal.tungsten.database.entity.User;
import trigonal.tungsten.authentication.exception.UserAlreadyExistsException;
import trigonal.tungsten.authentication.dto.UserDTO;

public interface IUserService {
    User registerNewUserAccount(UserDTO userDto) throws UserAlreadyExistsException;
}
