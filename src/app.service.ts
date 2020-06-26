import { Injectable } from '@nestjs/common';
import * as baseX from "base-x";
import { createHash } from 'crypto';

@Injectable()
export class AppService {
  validateRipple(address: string): { address: string, isValid: boolean } {
    const isValid = this.isValidRippleAddress(address);
    return { address, isValid }
  }

  sha256Checksum(payload) {
    //var sha = new jsSHA('SHA-256', format);
    var sha256 = createHash("sha256").update(payload).digest("hex");
    //sha.update(payload);
    return sha256; //sha.getHash(format);
  }

  private ALLOWED_CHARS = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz';
  private codec = baseX(this.ALLOWED_CHARS);
  private regexp = new RegExp('^r[' + this.ALLOWED_CHARS + ']{27,35}$');

  isValidAddress(address) {
    if (this.regexp.test(address)) {
      return this.verifyChecksum(address);
    }

    return false;
  }

  verifyChecksum(address) {
    var bytes = this.codec.decode(address);
    var computedChecksum = this.sha256Checksum(bytes.slice(0, -4));
    var checksum = bytes.slice(-4).toString("hex");

    return computedChecksum === checksum
  }

  isValidRippleAddress(address: string): boolean {
    return this.isValidAddress(address);
  }
}
