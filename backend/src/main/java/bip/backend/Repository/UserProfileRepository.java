package bip.backend.Repository;

import bip.backend.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {
    Boolean existsByJobTitle(String jobTitle);

    UserProfile findByJobTitle(String jobTitle);

    UserProfile findByProfileType(String profileType);

    UserProfile findUserProfileByJobTitle(String jobTitle);
}
