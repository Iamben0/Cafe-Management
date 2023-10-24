package bip.backend.Repository;

import bip.backend.Entity.UserAccount;
import bip.backend.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    boolean existsByUsername(String username);
    UserAccount findByUsername(String username);
    UserAccount findByUsernameAndPassword(String username, String password);
    @Query("select (count(u) > 0) from UserAccount u where u.username = ?1 or u.password = ?2")
    boolean existsByUsernameOrPassword(String username, String password);
    @Query("select (count(u) > 0) from UserAccount u where u.username = ?1 and u.password = ?2")
    boolean existsByUsernameAndPassword(String username, String password);

    boolean existsByEmail(String email);
}