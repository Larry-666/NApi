class HuomHair{
    constructor(Numero,Tyyppi,Aihe,Rooli){
        this.Numero = Numero; 
        this.Tyyppi = Tyyppi; 
        this.Aihe = Aihe;
        this.Rooli = Rooli; 
    }
 }
 
 class Vast{
    constructor(Numero,Tyyppi,Sähköposti1,Sähköposti2){
        this.Numero = Numero; 
        this.Rooli = Rooli; 
        this.Sähköposti1 = Sähköposti1;
        this.Sähköposti2 = Sähköposti2; 
    }
 }
 
 class Viestit{
    constructor(Numero,Huomio,Lähettäjä, VastRooli, Aihe, Päivämäärä){
        this.Numero = Numero; 
        this.Huomio = Huomio; 
        this.Lähettäjä = Lähettäjä;
        this.VastRooli = VastRooli; 
        this.Aihe = Aihe;
        this.Päivämäärä = Päivämäärä;
    }
 }
 
 class Teams{
    constructor(subject, body, hostedContents){
        this.subject = subject;
        this.body = body;
        this.hostedContents = hostedContents
    }
 }

 

 module.exports = HuomHair
 module.exports = Vast
 module.exports = Viestit
 module.exports = Teams