package bip.backend.Controller.Owner;

import bip.backend.Entity.WorkSlot;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")

@RequestMapping("/owner/create")
public class CreateWorkSlotController {
    @PostMapping("/work-slot/")
    public ResponseEntity<String> submitWorkSlotDetails(@RequestBody String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(json);
            new WorkSlot().createWorkSlot(
                    jsonNode.get("shift").asText(),
                    jsonNode.get("role").asText(),
                    jsonNode.get("date").asText()
            );
            return ResponseEntity.ok("Work Slot created!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}