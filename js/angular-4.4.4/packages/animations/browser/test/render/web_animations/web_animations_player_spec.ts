/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {DOMAnimation} from '../../../src/render/web_animations/dom_animation';
import {WebAnimationsPlayer} from '../../../src/render/web_animations/web_animations_player';

export function main() {
  let element: any;
  let innerPlayer: MockDomAnimation|null = null;
  beforeEach(() => {
    element = {};
    element['animate'] = () => { return innerPlayer = new MockDomAnimation(); };
  });

  describe('WebAnimationsPlayer tests', () => {
    it('should automatically pause the player when created and initialized', () => {
      const keyframes = [
        {opacity: 0, offset: 0},
        {opacity: 1, offset: 1},
      ];

      const player = new WebAnimationsPlayer(element, keyframes, {duration: 1000});

      player.init();
      const p = innerPlayer !;
      expect(p.log).toEqual(['pause']);

      player.play();
      expect(p.log).toEqual(['pause', 'play']);
    });

    it('should not pause the player if created and started before initialized', () => {
      const keyframes = [
        {opacity: 0, offset: 0},
        {opacity: 1, offset: 1},
      ];

      const player = new WebAnimationsPlayer(element, keyframes, {duration: 1000});

      player.play();
      const p = innerPlayer !;
      expect(p.log).toEqual(['play']);
    });
  });
}

class MockDomAnimation implements DOMAnimation {
  log: string[] = [];
  cancel(): void { this.log.push('cancel'); }
  play(): void { this.log.push('play'); }
  pause(): void { this.log.push('pause'); }
  finish(): void { this.log.push('finish'); }
  onfinish: Function = () => {};
  position: number = 0;
  currentTime: number = 0;
  addEventListener(eventName: string, handler: (event: any) => any): any {}
  dispatchEvent(eventName: string): any {}
}
