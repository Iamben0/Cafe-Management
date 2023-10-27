package bip.backend.Repository;

import bip.backend.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {
    Boolean existsByJobTitle(String jobTitle);
    List<UserProfile> findByJobTitle(String jobTitle);
    @Query("select u from UserProfile u where upper(u.jobTitle) like upper(concat('%', ?1, '%'))")
    List<UserProfile> findByJobTitleContainsIgnoreCase(String jobTitle);
}
