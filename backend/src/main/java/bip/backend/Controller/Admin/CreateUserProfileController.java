package bip.backend.Controller.Admin;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import bip.backend.Entity.UserProfile;
import bip.backend.Repository.UserProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/create")
public class CreateUserProfileController {

    private final UserProfileRepository userProfileRepository;

    public CreateUserProfileController(UserProfileRepository userProfileRepository)
    {
        this.userProfileRepository = userProfileRepository;
    }

    @PostMapping("/")
    public ResponseEntity<String> submitUserProfileDetails(@RequestBody String json)
    {

        ObjectMapper objectMapper = new ObjectMapper();
        try {

            JsonNode jsonNode = objectMapper.readTree(json);
            UserProfile.createUserProfile(
                    jsonNode.get("profileType").asText(),
                    jsonNode.get("jobTitle").asText(),
                    userProfileRepository
            );
            return ResponseEntity.ok("User Profile created!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}