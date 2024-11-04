import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  @ViewChild('featuresArea') featuresArea!: ElementRef;
  @Input() isDarkTheme: boolean = false;

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
        'Easily create documentation using annotations, for your code.',
      icon: 'pi pi-tags',
    },
  ];
}
