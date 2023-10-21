package bip.backend.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_account")
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "password", nullable = false, length = 50)
    private String password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "up")
    private UserProfile up;



/*
MyWebsite.com
/page.jsx {render a login, if not logged in}  --
... login is successful
/page.jsx {render a homepage, if already logged in}  --
/someOtherFile {render a homepage}

/Components/GenericHeader.jsx {render <HeaderManager />, if a manager, render nothing if not logged in}

*/

}