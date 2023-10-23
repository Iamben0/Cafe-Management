package bip.backend.Repository;

import bip.backend.Entity.UserAccount;
import bip.backend.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    boolean existsByUsername(String username);
    UserAccount findByUsername(String username);
    UserAccount findByUsernameAndPassword(String username, String password);
    boolean existsByUsernameOrPassword(String username, String password);
}