import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, BadgeModule, ChipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  codeExample = `Import in your pom.xml

<dependency>
    <groupId>io.github.jsoapdoc</groupId>
    <artifactId>jsoapdoc-core</artifactId>
    <version>0.0.3</version>
</dependency>

`;

  features = [
    {
      title: 'Automated Documentation',
      description:
        'Generates detailed documentation for your SOAP services with minimal configuration.',
      icon: 'pi pi-file',
    },
    {
      title: 'SOAP 1.1 and 1.2 Compatibility',
      description:
        'Fully supports both SOAP 1.1 and 1.2 protocols, ensuring broad compatibility.',
      icon: 'pi pi-cog',
    },
    {
      title: 'Annotation-Based Setup',
      description:
        'Easily create documentation using annotations, simplifying integration with your codebase.',
      icon: 'pi pi-tags',
    },
  ];
}
