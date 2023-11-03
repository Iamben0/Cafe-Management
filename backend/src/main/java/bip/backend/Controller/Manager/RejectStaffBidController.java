package bip.backend.Controller.Manager;

import bip.backend.Entity.Bid;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")

@RequestMapping("/manager/view/staff-bid/reject/")
public class RejectStaffBidController {
    @PutMapping("/{bidId}/")
    public ResponseEntity<String> rejectBid(@PathVariable int bidId,
                                              @RequestBody String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(json);
            new Bid().rejectBid(bidId, jsonNode.get("status").asText());
            return ResponseEntity.ok("Bid Rejected!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
