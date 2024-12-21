package ltu.group06.work.resoucesmanager.repository2;

import ltu.group06.work.resoucesmanager.entity.User2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository2 extends JpaRepository<User2, Long> {
    Optional<User2> findByUsername(String username);
    Optional<User2> findByEmail(String email);
    User2 findUserByUsername(String username);
}