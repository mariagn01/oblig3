package webprog.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

@Autowired
private BillettRepository rep;

    @GetMapping("/hentFilmer")
    public ArrayList<String> hentFilmer() {
        ArrayList<String> filmliste = new ArrayList<>();
        filmliste.add("Oppenheimer");
        filmliste.add("Barbie");
        filmliste.add("Anyone Like You");
        filmliste.add("Dune");
        return filmliste;
    }
    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett) {
        rep.lagreBillett(innBillett);
    }

    @GetMapping("/hentBilletter")
    public List<Billett> hentBilletter() {
        return rep.hentBilletter();
    }

    @GetMapping("/slettAlle")
    public void slettAlle() {
        rep.slettBilletter();
    }
}
