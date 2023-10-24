package bip.backend.Controller.Admin;

import bip.backend.Entity.UserProfile;
import bip.backend.Repository.UserProfileRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/search")
public class SearchUserProfileController {

    private final UserProfileRepository userProfileRepository;

    public SearchUserProfileController(UserProfileRepository userProfileRepository)
    {
        this.userProfileRepository = userProfileRepository;
    }

    // Search by job title
    @GetMapping("/{jobTitle}")
    public ResponseEntity<String> submitSearchCriteria(@RequestBody String json, @PathVariable String jobTitle)
    {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(json);
            String searchCriteria = jsonNode.get("jobTitle").asText();
            return ResponseEntity.ok(UserProfile.searchProfile( searchCriteria, userProfileRepository));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}