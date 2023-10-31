package bip.backend.Repository;

import bip.backend.Entity.UserAccount;
import bip.backend.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    boolean existsByUsername(String username);
    UserAccount findByUsername(String username);
    UserAccount findByUsernameAndPassword(String username, String password);
    boolean existsByUsernameAndPassword(String username, String password);
    List<UserAccount> findByNameContainsIgnoreCase(String name);

    UserAccount findByRole(String s);
}