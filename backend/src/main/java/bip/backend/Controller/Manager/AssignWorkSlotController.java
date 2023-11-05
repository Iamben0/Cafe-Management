package bip.backend.Controller.Manager;

import bip.backend.Entity.UserProfile;
import bip.backend.Entity.WorkSlot;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/manager/view/work-slots/assign")
public class AssignWorkSlotController {
    @PostMapping("/")
    public ResponseEntity<String> assignStaffToWorkSlot(@RequestBody String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(json);
            new WorkSlot().assignStaffToWorkSlot(
                    jsonNode.get("workSlotId").asText(),
                    jsonNode.get("staffId").asText()
            );
            return ResponseEntity.ok("Work Slot Assigned!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}