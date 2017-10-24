/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {scheduleMicroTask} from '../util';
import {AnimationPlayer} from './animation_player';

export class AnimationGroupPlayer implements AnimationPlayer {
  private _onDoneFns: Function[] = [];
  private _onStartFns: Function[] = [];
  private _finished = false;
  private _started = false;
  private _destroyed = false;
  private _onDestroyFns: Function[] = [];

  public parentPlayer: AnimationPlayer|null = null;
  public totalTime: number = 0;

  constructor(private _players: AnimationPlayer[]) {
    let doneCount = 0;
    let destroyCount = 0;
    let startCount = 0;
    const total = this._players.length;

    if (total == 0) {
      scheduleMicroTask(() => this._onFinish());
    } else {
      this._players.forEach(player => {
        player.parentPlayer = this;
        player.onDone(() => {
          if (++doneCount >= total) {
            this._onFinish();
          }
        });
        player.onDestroy(() => {
          if (++destroyCount >= total) {
            this._onDestroy();
          }
        });
        player.onStart(() => {
          if (++startCount >= total) {
            this._onStart();
          }
        });
      });
    }

    this.totalTime = this._players.reduce((time, player) => Math.max(time, player.totalTime), 0);
  }

  private _onFinish() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach(fn => fn());
      this._onDoneFns = [];
    }
  }

  init(): void { this._players.forEach(player => player.init()); }

  onStart(fn: () => void): void { this._onStartFns.push(fn); }

  private _onStart() {
    if (!this.hasStarted()) {
      this._onStartFns.forEach(fn => fn());
      this._onStartFns = [];
      this._started = true;
    }
  }

  onDone(fn: () => void): void { this._onDoneFns.push(fn); }

  onDestroy(fn: () => void): void { this._onDestroyFns.push(fn); }

  hasStarted() { return this._started; }

  play() {
    if (!this.parentPlayer) {
      this.init();
    }
    this._onStart();
    this._players.forEach(player => player.play());
  }

  pause(): void { this._players.forEach(player => player.pause()); }

  restart(): void { this._players.forEach(player => player.restart()); }

  finish(): void {
    this._onFinish();
    this._players.forEach(player => player.finish());
  }

  destroy(): void { this._onDestroy(); }

  private _onDestroy() {
    if (!this._destroyed) {
      this._destroyed = true;
      this._onFinish();
      this._players.forEach(player => player.destroy());
      this._onDestroyFns.forEach(fn => fn());
      this._onDestroyFns = [];
    }
  }

  reset(): void {
    this._players.forEach(player => player.reset());
    this._destroyed = false;
    this._finished = false;
    this._started = false;
  }

  setPosition(p: number): void {
    const timeAtPosition = p * this.totalTime;
    this._players.forEach(player => {
      const position = player.totalTime ? Math.min(1, timeAtPosition / player.totalTime) : 1;
      player.setPosition(position);
    });
  }

  getPosition(): number {
    let min = 0;
    this._players.forEach(player => {
      const p = player.getPosition();
      min = Math.min(p, min);
    });
    return min;
  }

  get players(): AnimationPlayer[] { return this._players; }

  beforeDestroy(): void {
    this.players.forEach(player => {
      if (player.beforeDestroy) {
        player.beforeDestroy();
      }
    });
  }
}
