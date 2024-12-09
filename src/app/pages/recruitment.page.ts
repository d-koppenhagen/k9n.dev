import { Component } from '@angular/core';

@Component({
  imports: [],
  styles: `
    .wrapper {
      margin-top: 0;
    }
  `,
  template: `
    <section class="wrapper alt">
      <div class="inner">
        <h2 class="major">Dear Recruiter, Talent Scout, Others,</h2>
        <p>
          Thanks for reaching out. I'm always interested in hearing about what
          new and exciting opportunities are out there. As a software engineer
          I'm sure you can imagine that I get a very high volume of recruiters
          reaching out via Mail, on LinkedIn, XING, etc. It is a wonderful
          position of privilege to be in and I'm thankful for it.
        </p>

        <p>
          It does however mean that I don't have the time to hop on a call with
          everyone who reaches out. A lot of the time, incoming messages
          represent a very poor fit indeed.
        </p>

        <p>
          That being said, I want to filter out early matching job opportunities
          from spam or unqualified messages. In order to do so, please read and
          verify, you can positively check the following requirements with this
          ones, the position you/your client is offering:
        </p>

        <ul>
          <li>
            The position is really related to <b>JavaScript/TypeScript</b> and
            <b>frontend or fullstack development/-architecture</b>
          </li>
          <li><b>Flexible Working Hours</b> are obviously</li>
          <li>At least <b>30 days</b> of annual <b>vacation</b></li>
          <li>
            <b>100% remote job</b> or a position based in <b>Berlin</b> with
            flexibility to work for at least 2 days a week from home
          </li>
          <li>An annual salary of <b>EUR 95.000</b> or more</li>
          <li>
            At least <b>EUR 2000 annual training budget</b> (visiting
            conferences, joining Events, on-site/remote trainings)
          </li>
          <li>
            low hierarchies in a <b>healthy and balanced</b> working atmosphere
          </li>
          <li>No connection to the defense industry</li>
          <li>A permanent employment contract</li>
        </ul>

        <p>
          If <b>all or at least 90% of this requirements</b> from myself listed
          above will match with the offer you have, you can contact me again.
          Furthermore I would ask you to send along the company name, a job
          description and, total compensation details for the role you're
          reaching out.
        </p>

        <p>
          While I very much appreciate the fact that exceptionally talented and
          engaged recruiters reach out consistently, sorting serious and high
          quality opportunities from spam would be a full time job without an
          autoresponder.
        </p>

        <p>Thanks for your understanding.</p>

        <p>Best regards, Danny</p>
      </div>
    </section>
  `,
})
export default class RecruitmentPage {}
