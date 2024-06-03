package trigonal.tungsten.database.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import trigonal.tungsten.database.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String email);

    User findByActivationToken(String token);
}