<template>
    <div class="contentPageHeader backList box-shadow main-policy">
      <img src="@/../image/security.svg" class="mainPoster">

      <article class="content-items-policy no-select">
        <p>This Website collects some Personal Data from its Users.</p>

        <h3>Owner and Data Controller</h3>
        <p>grinn, City, Contry</p>
        <p>Owner contact email: support@grinn.net</p>
        <h3>Types of Data collected</h3>
        <p>Among the types of Personal Data that this Application collects, by itself or through third parties, there are: Cookies, Usage Data and email address.</p>
        <p>Complete details on each type of Personal Data collected are provided in the dedicated sections of this privacy policy or by specific explanation texts displayed prior to the Data collection. Personal Data may be freely provided by the User, or, in case of Usage Data, collected automatically when using this Application. Unless specified otherwise, all Data requested by this Application is mandatory and failure to provide this Data may make it impossible for this Application to provide its services. In cases where this Application specifically states that some Data is not mandatory, Users are free not to communicate this Data without consequences to the availability or the functioning of the Service. Users who are uncertain about which Personal Data is mandatory are welcome to contact the Owner. Any use of Cookies – or of other tracking tools – by this Application or by the owners of third-party services used by this Application serves the purpose of providing the Service required by the User, in addition to any other purposes described in the present document and in the Cookie Policy, if available.</p>
        <p>Users are responsible for any third-party Personal Data obtained, published or shared through this Application and confirm that they have the third party's consent to provide the Data to the Owner.</p>

        <h3>Mode and place of processing the Data</h3>
        <h4>Methods of processing</h4>
        <p>The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data. The Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Owner, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of this Application (administration, sales, marketing, legal, system administration) or external parties (such as third-party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Owner at any time.</p>

        <h4>Legal basis of processing</h4>
        <p>The Owner may process Personal Data relating to Users if one of the following applies:</p>
        <ul>
          <li v-for="procedure in isProcedures">{{procedure}}</li>
        </ul>
        <p>In any case, the Owner will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.</p>

        <h4>Place</h4>
        <p>The Data is processed at the Owner's operating offices and in any other places where the parties involved in the processing are located.</p>
        <p>Depending on the User's location, data transfers may involve transferring the User's Data to a country other than their own. To find out more about the place of processing of such transferred Data, Users can check the section containing details about the processing of Personal Data.</p>
        <p>Users are also entitled to learn about the legal basis of Data transfers to a country outside the European Union or to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by the Owner to safeguard their Data.</p>
        <p>If any such transfer takes place, Users can find out more by checking the relevant sections of this document or inquire with the Owner using the information provided in the contact section.</p>

        <h4>Retention time</h4>
        <p>Personal Data shall be processed and stored for as long as required by the purpose they have been collected for.</p>
        <p>Therefore:</p>
        <ul>
          <li v-for="item in isPersonalData">{{item}}</li>
        </ul>
        <p>The Owner may be allowed to retain Personal Data for a longer period whenever the User has given consent to such processing, as long as such consent is not withdrawn. Furthermore, the Owner may be obliged to retain Personal Data for a longer period whenever required to do so for the performance of a legal obligation or upon order of an authority.</p>
        <p>Once the retention period expires, Personal Data shall be deleted. Therefore, the right to access, the right to erasure, the right to rectification and the right to data portability cannot be enforced after expiration of the retention period.</p>

        <h3>The purposes of processing</h3>
        <p>The Data concerning the User is collected to allow the Owner to provide its Services, as well as for the following purposes: Access to third-party accounts, Analytics and Contacting the User.</p>
        <p>Users can find further detailed information about such purposes of processing and about the specific Personal Data used for each purpose in the respective sections of this document.</p>

        <h3>Facebook permissions asked by this Application</h3>
        <p>This Application may ask for some Facebook permissions allowing it to perform actions with the User's Facebook account and to retrieve information, including Personal Data, from it. This service allows this Application to connect with the User's account on the Facebook social network, provided by Facebook Inc.</p>
        <p>For more information about the following permissions, refer to the
          <a
            href="https://developers.facebook.com/docs/authentication/permissions/"
            title="Facebook permissions documentation"
            target="_blank"
          >Facebook permissions documentation</a> and to the
          <a
            href="https://www.facebook.com/about/privacy/"
            title="Facebook privacy policy"
            target="_blank"
          >Facebook privacy policy</a>.
        </p>
        <p>The permissions asked are the following:</p>

        <h4>Basic information</h4>
        <p>By default, this includes certain User’s Data such as id, name, picture, gender, and their locale. Certain connections of the User, such as the Friends, are also available. If the User has made more of their Data public, more information will be available.</p>

        <h4>Access Friend Lists</h4>
        <p>Provides access to any friend lists the User created.</p>

        <h4>Email</h4>
        <p>Provides access to the User's primary email address.</p>

        <h3>Detailed information on the processing of Personal Data</h3>
        <p>Personal Data is collected for the following purposes and using the following services:</p>

        <h4>Access to third-party accounts</h4>
        <p>This type of service allows this Application to access Data from your account on a third-party service and perform actions with it.These services are not activated automatically, but require explicit authorization by the User.</p>
        <p>Facebook account access (this Application)</p>
        <p>This service allows this Application to connect with the User's account on the Facebook social network, provided by Facebook, Inc.</p>
        <p>Permissions asked: Access Friend Lists and Email.</p>
        <p>Place of processing: United States –
          <a href="https://www.facebook.com/policy.php" target="_blank">Privacy Policy</a>. Privacy Shield participant. Twitter account access (Twitter, Inc.) /p&gt;
        </p>
        <p>This service allows this Application to connect with the User's account on the Twitter social network, provided by Twitter, Inc.</p>
        <p>Personal Data collected: various types of Data as specified in the privacy policy of the service.</p>
        <p>Place of processing: United States –
          <a href="https://twitter.com/privacy" target="_blank">Privacy Policy</a>. Privacy Shield participant.
        </p>

        <h4>Contacting the User</h4>
        <p>Mailing list or newsletter (this Application)</p>
        <p>By registering on the mailing list or for the newsletter, the User’s email address will be added to the contact list of those who may receive email messages containing information of commercial or promotional nature concerning this Application. Your email address might also be added to this list as a result of signing up to this Application or after making a purchase.</p>
        <p>Personal Data collected: email address.</p>

        <h4>Analytics</h4>
        <p>The services contained in this section enable the Owner to monitor and analyze web traffic and can be used to keep track of User behavior.</p>
        <p>Google Analytics (Google Inc.)</p>
        <p>Google Analytics is a web analysis service provided by Google Inc. (“Google”). Google utilizes the Data collected to track and examine the use of this Application, to prepare reports on its activities and share them with other Google services.</p>
        <p>Google may use the Data collected to contextualize and personalize the ads of its own advertising network.</p>
        <p>Personal Data collected: Cookies and Usage Data.</p>
        <p>Place of processing: United States –
          <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank">Privacy Policy</a> – Opt Out. Privacy Shield participant.
        </p>

        <h3>The rights of Users</h3>
        <p>Users may exercise certain rights regarding their Data processed by the Owner. In particular, Users have the right to do the following:</p>
        <ul>
          <li v-for="right in isRights">{{right}}</li>
        </ul>

        <h4>Details about the right to object to processing</h4>
        <p>Where Personal Data is processed for a public interest, in the exercise of an official authority vested in the Owner or for the purposes of the legitimate interests pursued by the Owner, Users may object to such processing by providing a ground related to their particular situation to justify the objection.</p>
        <p>Users must know that, however, should their Personal Data be processed for direct marketing purposes, they can object to that processing at any time without providing any justification. To learn, whether the Owner is processing Personal Data for direct marketing purposes, Users may refer to the relevant sections of this document.</p>

        <h4>How to exercise these rights</h4>
        <p>Any requests to exercise User rights can be directed to the Owner through the contact details provided in this document. These requests can be exercised free of charge and will be addressed by the Owner as early as possible and always within one month.</p>

        <h3>Additional information about Data collection and processing</h3>
        <h4>Legal action</h4>
        <p>The User's Personal Data may be used for legal purposes by the Owner in Court or in the stages leading to possible legal action arising from improper use of this Application or the related Services.</p>
        <p>The User declares to be aware that the Owner may be required to reveal personal data upon request of public authorities.</p>

        <h4>Additional information about User's Personal Data</h4>
        <p>In addition to the information contained in this privacy policy, this Application may provide the User with additional and contextual information concerning particular Services or the collection and processing of Personal Data upon request.</p>

        <h4>System logs and maintenance</h4>
        <p>For operation and maintenance purposes, this Application and any third-party services may collect files that record interaction with this Application (System logs) use other Personal Data (such as the IP Address) for this purpose.</p>

        <h4>Information not contained in this policy</h4>
        <p>More details concerning the collection or processing of Personal Data may be requested from the Owner at any time. Please see the contact information at the beginning of this document.</p>

        <h4>How “Do Not Track” requests are handled</h4>
        <p>This Application does not support “Do Not Track” requests. To determine whether any of the third-party services it uses honor the “Do Not Track” requests, please read their privacy policies.</p>

        <h4>Changes to this privacy policy</h4>
        <p>The Owner reserves the right to make changes to this privacy policy at any time by giving notice to its Users on this page and possibly within this Application and/or - as far as technically and legally feasible - sending a notice to Users via any contact information available to the Owner. It is strongly recommended to check this page often, referring to the date of the last modification listed at the bottom.</p>
        <p>Should the changes affect processing activities performed on the basis of the User’s consent, the Owner shall collect new consent from the User, where required.</p>
        <details>
          <summary>Definitions and legal references</summary>
          <h4>Personal Data (or Data)</h4>
          <p>Any information that directly, indirectly, or in connection with other information — including a personal identification number — allows for the identification or identifiability of a natural person.</p>

          <h4>Usage Data</h4>
          <p>Information collected automatically through this Application (or third-party services employed in this Application), which can include: the IP addresses or domain names of the computers utilized by the Users who use this Application, the URI addresses (Uniform Resource Identifier), the time of the request, the method utilized to submit the request to the server, the size of the file received in response, the numerical code indicating the status of the server's answer (successful outcome, error, etc.), the country of origin, the features of the browser and the operating system utilized by the User, the various time details per visit (e.g., the time spent on each page within the Application) and the details about the path followed within the Application with special reference to the sequence of pages visited, and other parameters about the device operating system and/or the User's IT environment.</p>

          <h4>User</h4>
          <p>The individual using this Application who, unless otherwise specified, coincides with the Data Subject.</p>
          
          <h4>Data Subject</h4>
          <p>The natural person to whom the Personal Data refers.</p>
          
          <h4>Data Processor (or Data Supervisor)</h4>
          <p>The natural or legal person, public authority, agency or other body which processes Personal Data on behalf of the Controller, as described in this privacy policy.</p>
          
          <h4>Data Controller (or Owner)</h4>
          <p>The natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of Personal Data, including the security measures concerning the operation and use of this Application. The Data Controller, unless otherwise specified, is the Owner of this Application.</p>
          
          <h4>This Application</h4>
          <p>The means by which the Personal Data of the User is collected and processed.</p>
          
          <h4>Service</h4>
          <p>The service provided by this Application as described in the relative terms (if available) and on this site/application.</p>
          
          <h4>European Union (or EU)</h4>
          <p>Unless otherwise specified, all references made within this document to the European Union include all current member states to the European Union and the European Economic Area.</p>
          
          <h4>Cookies</h4>
          <p>Small sets of data stored in the User's device.</p>
        </details>
        
        <h4>Legal information</h4>
        <p>This privacy statement has been prepared based on provisions of multiple legislations, including Art. 13/14 of Regulation (EU) 2016/679 (General Data Protection Regulation). This privacy policy relates solely to this Application, if not stated otherwise within this document.</p>
      </article>
    </div>
</template>

<script>
export default {
    props: {
        isProcedures: Array,
        isPersonalData: Array,
        isRights: Array
    }
}
</script>
