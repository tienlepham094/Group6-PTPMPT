package ltu.group06.work.resoucesmanager.repository;

import ltu.group06.work.resoucesmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
//    Optional<User> findByUsername(String username);

    //    Optional<User> findByEmail(String email);
//    List<User> findByEmail(String email);
//
//    List<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.username = :usernameOrEmail OR u.email = :usernameOrEmail")
    Optional<User> findByUsernameOrEmail(String usernameOrEmail);


    List<User> findByEmailAndUsername(String email, String username);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    User findUserByUsername(String username);

}