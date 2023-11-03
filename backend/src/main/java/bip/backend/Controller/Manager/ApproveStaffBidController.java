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

@RequestMapping("/manager/view/staff-bid/approve/")
public class ApproveStaffBidController {
    @PutMapping("/{bidId}/")
    public ResponseEntity<String> approvedBid(@PathVariable int bidId,
                                              @RequestBody String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(json);
            new Bid().approveBid(bidId, jsonNode.get("status").asText());
            return ResponseEntity.ok("Bid Approved!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
