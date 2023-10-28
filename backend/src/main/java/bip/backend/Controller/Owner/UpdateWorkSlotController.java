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
@RequestMapping("/owner/update")
public class UpdateWorkSlotController {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PutMapping("/{id}/")
    public ResponseEntity<String> updateWorkSlot(@PathVariable String id,
                                                 @RequestBody String json) {
        try {
            JsonNode jsonNode = objectMapper.readTree(json);
            new WorkSlot().updateWorkSlot(id, jsonNode.get("shift").asText(),
                    jsonNode.get("role").asText(), jsonNode.get("date").asText());
            return ResponseEntity.ok("Work Slot Updated!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}