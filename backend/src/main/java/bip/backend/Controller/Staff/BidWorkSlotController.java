package bip.backend.Controller.Staff;

import bip.backend.Entity.Bid;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")

@RequestMapping("/staff/view/available-work-slots/bid/")
public class BidWorkSlotController {
    @PutMapping("/{workSlotId}/")
    public ResponseEntity<String> bidWorkSlot(@PathVariable int workSlotId,
                                              @RequestBody String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(json);
            new Bid().bidWorkSlot(workSlotId, Integer.parseInt(jsonNode.get("staffId").asText()));
            return ResponseEntity.ok("Bid Work Slot!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
